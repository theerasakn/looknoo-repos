# ──────────────────────────────────────────────
# PawTrip GCP — Cloud SQL (PostgreSQL)
# ──────────────────────────────────────────────

resource "google_sql_database_instance" "postgres" {
  name                = "${local.prefix}-db"
  database_version    = "POSTGRES_15"
  region              = var.region
  deletion_protection = var.environment == "prod" ? true : false

  settings {
    tier              = var.db_tier
    availability_type = var.environment == "prod" ? "REGIONAL" : "ZONAL"
    disk_size         = 10
    disk_autoresize   = true

    ip_configuration {
      ipv4_enabled                                  = false
      private_network                               = google_compute_network.vpc.id
      enable_private_path_for_google_cloud_services = true
    }

    backup_configuration {
      enabled                        = true
      start_time                     = "03:00"
      point_in_time_recovery_enabled = var.environment == "prod" ? true : false

      backup_retention_settings {
        retained_backups = var.environment == "prod" ? 14 : 3
      }
    }

    maintenance_window {
      day          = 7
      hour         = 4
      update_track = "stable"
    }

    database_flags {
      name  = "log_checkpoints"
      value = "on"
    }
  }

  depends_on = [google_service_networking_connection.private_vpc]
}

resource "google_sql_database" "pawtrip" {
  name     = local.db_name
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "pawtrip" {
  name     = local.db_user
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}
