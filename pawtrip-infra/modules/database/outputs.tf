output "instance_name" {
  description = "Cloud SQL instance name"
  value       = google_sql_database_instance.pawtrip.name
}

output "connection_name" {
  description = "Cloud SQL connection name (project:region:instance)"
  value       = google_sql_database_instance.pawtrip.connection_name
}

output "private_ip" {
  description = "Cloud SQL private IP address"
  value       = google_sql_database_instance.pawtrip.private_ip_address
}

output "database_name" {
  description = "Database name"
  value       = google_sql_database.pawtrip.name
}
