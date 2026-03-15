# ──────────────────────────────────────────────
# Module: database — Cloud SQL PostgreSQL + PostGIS
# ──────────────────────────────────────────────

resource "google_sql_database_instance" "pawtrip" {
  name                = "pawtrip-db-${var.environment}"
  project             = var.project_id
  region              = var.region
  database_version    = "POSTGRES_15"
  deletion_protection = var.deletion_protection

  depends_on = [var.private_vpc_connection]

  settings {
    tier              = var.db_tier
    availability_type = var.environment == "prod" ? "REGIONAL" : "ZONAL"
    disk_size         = var.disk_size_gb
    disk_type         = "PD_SSD"
    disk_autoresize   = true

    ip_configuration {
      ipv4_enabled                                  = false
      private_network                               = var.vpc_id
      enable_private_path_for_google_cloud_services = true
    }

    database_flags {
      name  = "cloudsql.iam_authentication"
      value = "on"
    }

    database_flags {
      name  = "max_connections"
      value = var.environment == "prod" ? "200" : "100"
    }

    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = var.environment == "prod"
      start_time                     = "03:00"
      location                       = var.region

      backup_retention_settings {
        retained_backups = var.environment == "prod" ? 30 : 7
        retention_unit   = "COUNT"
      }
    }

    maintenance_window {
      day          = 7 # Sunday
      hour         = 4 # 4 AM
      update_track = "stable"
    }

    insights_config {
      query_insights_enabled  = var.environment == "prod"
      query_plans_per_minute  = var.environment == "prod" ? 5 : 0
      query_string_length     = 1024
      record_application_tags = true
      record_client_address   = false
    }
  }
}

resource "google_sql_database" "pawtrip" {
  name     = "pawtrip"
  project  = var.project_id
  instance = google_sql_database_instance.pawtrip.name
}

resource "google_sql_user" "postgres" {
  name     = "postgres"
  project  = var.project_id
  instance = google_sql_database_instance.pawtrip.name
  password = var.db_password
}

# App user with limited privileges
resource "google_sql_user" "app" {
  name     = "pawtrip-app"
  project  = var.project_id
  instance = google_sql_database_instance.pawtrip.name
  password = var.db_password
}
