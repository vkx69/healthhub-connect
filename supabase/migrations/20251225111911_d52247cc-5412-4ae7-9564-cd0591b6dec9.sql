-- Create health reminders table
CREATE TABLE public.health_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  reminder_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.health_reminders ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Patients can view their own reminders"
ON public.health_reminders FOR SELECT
USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));

CREATE POLICY "Patients can create their own reminders"
ON public.health_reminders FOR INSERT
WITH CHECK (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));

CREATE POLICY "Patients can update their own reminders"
ON public.health_reminders FOR UPDATE
USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));

CREATE POLICY "Patients can delete their own reminders"
ON public.health_reminders FOR DELETE
USING (patient_id IN (SELECT id FROM public.patients WHERE user_id = auth.uid()));