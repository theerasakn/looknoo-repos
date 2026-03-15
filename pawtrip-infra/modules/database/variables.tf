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

variable "vpc_id" {
  description = "VPC network ID"
  type        = string
}

variable "private_vpc_connection" {
  description = "Private VPC connection dependency"
  type        = any
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "db_tier" {
  description = "Cloud SQL machine tier"
  type        = string
  default     = "db-f1-micro"
}

variable "disk_size_gb" {
  description = "Initial disk size in GB"
  type        = number
  default     = 10
}

variable "deletion_protection" {
  description = "Enable deletion protection"
  type        = bool
  default     = false
}
