# Resource Requirements

## Server Requirements

One Ubuntu VPS server is sufficient for now.

## AWS EC2 Instance Creation

When creating an EC2 instance, register an SSH key and provide the following information:

- SSH key pair
- Instance IP address (for server access)

### Security Group Settings (Inbound Rules)

If you're not providing IAM user access, please configure the following inbound rules:

- **SSH (Port 22)**: Your IP address for server access
- **HTTP (Port 80)**: 0.0.0.0/0 (for web access)
- **HTTPS (Port 443)**: 0.0.0.0/0 (for secure web access)
- **Custom TCP (Port 3000)**: 0.0.0.0/0 (for frontend development)
- **Custom TCP (Port 8000)**: 0.0.0.0/0 (for backend API)

## Alternative: IAM User

Alternatively, if you can create an IAM user in your AWS account and provide it to me, I can handle all the setup.

### Required IAM User Permissions

The IAM user should have the following policies attached:

- **EC2FullAccess**: For managing EC2 instances
- **DynamoDBFullAccess**: For database operations
- **S3FullAccess**: For file storage (if needed)
- **IAMReadOnlyAccess**: For reading IAM policies
- **CloudWatchLogsFullAccess**: For application logging

## Email Service

If you can provide an email service like SendGrid, I can also integrate that for email verification.

However, I recommend bypassing email verification during the development stage and integrating it later to save costs.
