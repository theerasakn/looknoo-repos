variable "project_name" {
  description = "Human-readable project name"
  type        = string
}

variable "project_id" {
  description = "Globally unique GCP project ID"
  type        = string
}

variable "billing_account_id" {
  description = "GCP billing account ID"
  type        = string
}

variable "org_id" {
  description = "GCP organization ID (empty for personal accounts)"
  type        = string
  default     = ""
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
}
