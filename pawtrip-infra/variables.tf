# ──────────────────────────────────────────────
# PawTrip GCP — Variables
# ──────────────────────────────────────────────

variable "project_id" {
  description = "Existing GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP region for all resources"
  type        = string
  default     = "asia-southeast1"
}

variable "zone" {
  description = "GCP zone (for zonal resources)"
  type        = string
  default     = "asia-southeast1-a"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

# ── Cloud SQL ────────────────────────────────

variable "db_tier" {
  description = "Cloud SQL machine tier"
  type        = string
  default     = "db-f1-micro"
}

variable "db_password" {
  description = "PostgreSQL password for pawtrip user"
  type        = string
  sensitive   = true
}

# ── Cloud Run ────────────────────────────────

variable "api_image" {
  description = "Container image for the API (e.g. gcr.io/PROJECT/pawtrip-api:latest)"
  type        = string
  default     = "gcr.io/cloudrun/hello"
}

variable "api_cpu" {
  description = "CPU allocation for Cloud Run"
  type        = string
  default     = "1"
}

variable "api_memory" {
  description = "Memory allocation for Cloud Run"
  type        = string
  default     = "512Mi"
}

variable "api_min_instances" {
  description = "Minimum Cloud Run instances (0 = scale to zero)"
  type        = number
  default     = 0
}

variable "api_max_instances" {
  description = "Maximum Cloud Run instances"
  type        = number
  default     = 3
}

# ── External API Keys ────────────────────────

variable "google_maps_api_key" {
  description = "Google Maps Platform API key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "google_oauth_client_id" {
  description = "Google OAuth 2.0 Client ID"
  type        = string
  default     = ""
}

variable "google_oauth_client_secret" {
  description = "Google OAuth 2.0 Client Secret"
  type        = string
  sensitive   = true
  default     = ""
}

variable "jwt_secret" {
  description = "JWT signing secret for API auth"
  type        = string
  sensitive   = true
  default     = ""
}

# ── Alerting ─────────────────────────────────

variable "alert_email" {
  description = "Email for billing and monitoring alerts"
  type        = string
  default     = ""
}

variable "billing_alert_amount" {
  description = "Monthly budget alert threshold in USD"
  type        = number
  default     = 50
}
