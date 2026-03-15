# ──────────────────────────────────────────────
# PawTrip GCP — Cloud Run (API Backend)
# ──────────────────────────────────────────────

resource "google_cloud_run_v2_service" "api" {
  name     = "${local.prefix}-api"
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      min_instance_count = var.api_min_instances
      max_instance_count = var.api_max_instances
    }

    vpc_access {
      connector = google_vpc_access_connector.connector.id
      egress    = "PRIVATE_RANGES_ONLY"
    }

    service_account = google_service_account.api.email

    containers {
      image = var.api_image

      resources {
        limits = {
          cpu    = var.api_cpu
          memory = var.api_memory
        }
      }

      # ── Environment Variables ──────────────

      env {
        name  = "NODE_ENV"
        value = var.environment
      }

      env {
        name  = "DB_HOST"
        value = google_sql_database_instance.postgres.private_ip_address
      }

      env {
        name  = "DB_NAME"
        value = local.db_name
      }

      env {
        name  = "DB_USER"
        value = local.db_user
      }

      env {
        name = "DB_PASSWORD"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.db_password.secret_id
            version = "latest"
          }
        }
      }

      env {
        name  = "STORAGE_BUCKET"
        value = google_storage_bucket.media.name
      }

      env {
        name  = "GOOGLE_MAPS_API_KEY"
        value = var.google_maps_api_key
      }

      env {
        name  = "GOOGLE_OAUTH_CLIENT_ID"
        value = var.google_oauth_client_id
      }

      env {
        name = "JWT_SECRET"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.jwt_secret.secret_id
            version = "latest"
          }
        }
      }

      # ── Health Check ───────────────────────

      startup_probe {
        http_get {
          path = "/health"
        }
        initial_delay_seconds = 5
        period_seconds        = 10
        failure_threshold     = 3
      }
    }
  }

  depends_on = [
    google_project_service.apis,
    google_secret_manager_secret_version.db_password,
    google_secret_manager_secret_version.jwt_secret,
  ]
}

# ── Allow unauthenticated access (public API) ─

resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.api.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
