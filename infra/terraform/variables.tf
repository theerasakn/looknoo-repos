# ──────────────────────────────────────────────
# PawTrip GCP — Variable Declarations
# ──────────────────────────────────────────────

# ── Billing & Organization ───────────────────

variable "billing_account_id" {
  description = "GCP Billing Account ID (console.cloud.google.com/billing → Account ID)"
  type        = string
}

variable "org_id" {
  description = "GCP Organization ID — leave empty for personal accounts"
  type        = string
  default     = ""
}

# ── Admin / Alerts ───────────────────────────

variable "admin_email" {
  description = "GCP admin email"
  type        = string
}

variable "alert_email" {
  description = "Email to receive billing alerts"
  type        = string
}

variable "billing_alert_amount" {
  description = "Monthly billing alert threshold in USD"
  type        = number
  default     = 100
}

# ── Region / Zone ────────────────────────────

variable "region" {
  description = "GCP region for resources"
  type        = string
  default     = "asia-southeast1"
}

variable "zone" {
  description = "GCP zone for zonal resources"
  type        = string
  default     = "asia-southeast1-a"
}

# ── Google Maps ──────────────────────────────

variable "google_maps_api_key" {
  description = "Google Maps Platform API key"
  type        = string
  sensitive   = true
}

# ── Google OAuth ─────────────────────────────

variable "google_oauth_client_id" {
  description = "Google OAuth 2.0 Client ID"
  type        = string
}

variable "google_oauth_client_secret" {
  description = "Google OAuth 2.0 Client Secret (GOCSPX-...)"
  type        = string
  sensitive   = true
  default     = ""
}

# ── Auto-generated Secrets ───────────────────

variable "jwt_secret" {
  description = "JWT signing secret (openssl rand -hex 32)"
  type        = string
  sensitive   = true
}

variable "db_password_dev" {
  description = "Cloud SQL password — dev environment"
  type        = string
  sensitive   = true
}

variable "db_password_staging" {
  description = "Cloud SQL password — staging environment"
  type        = string
  sensitive   = true
}

variable "db_password_prod" {
  description = "Cloud SQL password — production environment"
  type        = string
  sensitive   = true
}
