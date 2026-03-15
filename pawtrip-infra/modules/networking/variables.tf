variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "subnet_cidr" {
  description = "Primary subnet CIDR range"
  type        = string
  default     = "10.0.0.0/20"
}

variable "connector_cidr" {
  description = "Serverless VPC connector CIDR"
  type        = string
  default     = "10.8.0.0/28"
}
