variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "project_number" {
  description = "GCP project number"
  type        = string
}

variable "billing_account_id" {
  description = "GCP billing account ID"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "alert_email" {
  description = "Email for billing alerts"
  type        = string
}

variable "alert_amount" {
  description = "Monthly budget alert amount in USD"
  type        = number
}
