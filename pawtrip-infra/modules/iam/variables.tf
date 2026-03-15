variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "github_owner" {
  description = "GitHub repository owner"
  type        = string
  default     = "theerasakn"
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
  default     = "looknoo-repos"
}
