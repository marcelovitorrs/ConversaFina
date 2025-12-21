terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
  }
}

provider "aws" {
  region = "us-east-2"
  default_tags {
    tags = {
      owner      = "conversafina"
      managed-by = "terraform"
    }
  }
}

# Provider for creating local archives (data "archive_file")
provider "archive" {}