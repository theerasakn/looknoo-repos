variable "billing_account_id" {
  type = string
}

variable "org_id" {
  type    = string
  default = ""
}

variable "admin_email" {
  type = string
}

variable "alert_email" {
  type = string
}

variable "region" {
  type    = string
  default = "asia-southeast1"
}

variable "zone" {
  type    = string
  default = "asia-southeast1-a"
}

variable "google_maps_api_key" {
  type      = string
  sensitive = true
}

variable "google_oauth_client_id" {
  type = string
}

variable "google_oauth_client_secret" {
  type      = string
  sensitive = true
  default   = ""
}

variable "jwt_secret" {
  type      = string
  sensitive = true
}

variable "db_password_dev" {
  type      = string
  sensitive = true
  default   = ""
}

variable "db_password_staging" {
  type      = string
  sensitive = true
}

variable "db_password_prod" {
  type      = string
  sensitive = true
  default   = ""
}

variable "billing_alert_amount" {
  type    = number
  default = 100
}
