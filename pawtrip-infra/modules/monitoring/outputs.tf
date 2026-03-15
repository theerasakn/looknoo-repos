output "budget_name" {
  description = "Billing budget name"
  value       = google_billing_budget.monthly.display_name
}

output "notification_channel_id" {
  description = "Notification channel ID"
  value       = google_monitoring_notification_channel.email.id
}
