-- Add ce_requirement column to licenses table
ALTER TABLE licenses ADD COLUMN ce_requirement INTEGER DEFAULT 0;
