terraform {
  required_version = "~> 1.3.7"
  required_providers {
    genesyscloud = {
      source  = "mypurecloud/genesyscloud"
      version = "~> 1.10.0"
    }
  }
}

# DEV ORG : MolinaHealthCare1
provider "genesyscloud" {
  oauthclient_id = "c141a5e2-a93d-4d8b-9b80-32161248dd8e"
  oauthclient_secret = "qT9ihNmZlfIX1QDn8G24InH0fePG-kLxvEnc1dcOvoE"
  aws_region = "us-west-2"
}