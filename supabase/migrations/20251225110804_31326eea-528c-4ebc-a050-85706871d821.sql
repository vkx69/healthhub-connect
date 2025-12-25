-- Create patients profile table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  blood_type TEXT,
  member_id TEXT UNIQUE DEFAULT 'MED-' || to_char(now(), 'YYYY') || '-' || floor(random() * 100000)::text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create allergies table
CREATE TABLE public.patient_allergies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  allergy TEXT NOT NULL,
  severity TEXT DEFAULT 'moderate',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create chronic conditions table
CREATE TABLE public.patient_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  condition TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  diagnosed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create medical history table
CREATE TABLE public.medical_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  visit_type TEXT NOT NULL, -- Consultation, Lab Test, Surgery, Emergency
  doctor_name TEXT NOT NULL,
  doctor_specialty TEXT,
  diagnosis TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  medication TEXT NOT NULL,
  purpose TEXT,
  doctor_name TEXT NOT NULL,
  prescribed_date DATE NOT NULL DEFAULT CURRENT_DATE,
  dosage TEXT,
  duration_days INTEGER DEFAULT 30,
  refills_left INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Active', -- Active, Completed, Expired
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create medical reports table
CREATE TABLE public.medical_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  file_type TEXT DEFAULT 'PDF', -- PDF, Image
  category TEXT DEFAULT 'Other', -- Lab Report, Radiology, Cardiology, Prescription, Other
  file_path TEXT,
  file_size TEXT,
  doctor_name TEXT,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_reports ENABLE ROW LEVEL SECURITY;

-- RLS policies for patients
CREATE POLICY "Users can view own patient profile" ON public.patients
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own patient profile" ON public.patients
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own patient profile" ON public.patients
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS policies for allergies
CREATE POLICY "Users can view own allergies" ON public.patient_allergies
  FOR SELECT USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own allergies" ON public.patient_allergies
  FOR ALL USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));

-- RLS policies for conditions
CREATE POLICY "Users can view own conditions" ON public.patient_conditions
  FOR SELECT USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own conditions" ON public.patient_conditions
  FOR ALL USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));

-- RLS policies for medical history
CREATE POLICY "Users can view own medical history" ON public.medical_history
  FOR SELECT USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own medical history" ON public.medical_history
  FOR INSERT WITH CHECK (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));

-- RLS policies for prescriptions
CREATE POLICY "Users can view own prescriptions" ON public.prescriptions
  FOR SELECT USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own prescriptions" ON public.prescriptions
  FOR INSERT WITH CHECK (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));

-- RLS policies for medical reports
CREATE POLICY "Users can view own reports" ON public.medical_reports
  FOR SELECT USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own reports" ON public.medical_reports
  FOR ALL USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));

-- Create storage bucket for medical reports
INSERT INTO storage.buckets (id, name, public) VALUES ('medical-reports', 'medical-reports', false);

-- Storage policies
CREATE POLICY "Users can upload own reports" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'medical-reports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own reports" ON storage.objects
  FOR SELECT USING (bucket_id = 'medical-reports' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own reports" ON storage.objects
  FOR DELETE USING (bucket_id = 'medical-reports' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_prescriptions_updated_at BEFORE UPDATE ON public.prescriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create patient profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.patients (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Patient'), NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for auto-creating patient profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();