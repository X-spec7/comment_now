# S3 Documentation — commentnow-app-storage

## Overview

Dedicated S3 bucket for the CommentNow project.
Safely stores static files, uploaded data, logs, and other files handled by the application.
Access is restricted to the IAM role CommentNowEC2SSMRole,
and operations on other buckets are not permitted.

## Basic Information

| Item            | Content                |
| --------------- | ---------------------- |
| Bucket Name     | commentnow-app-storage |
| Region          | ap-northeast-1 (Tokyo) |
| Encryption      | -                      |
| Public Settings | -                      |
| Access Rights   | -                      |

## Security Settings

| Item                 | Setting Value |
| -------------------- | ------------- |
| Public Access Block  | -             |
| → New public ACLs    | -             |
| → Public ACL uploads | -             |
| → Any public write   | -             |
| → Public read access | -             |
| Bucket Policy        | -             |
| Encryption           | -             |
| Versioning           | -             |
| MFA Delete           | -             |

## IAM Access Control

### Related Policies

| Policy Name          | Purpose           | Access Scope                       |
| -------------------- | ----------------- | ---------------------------------- |
| -                    | S3 operations     | commentnow-app-storage bucket only |
| CommentNowEC2SSMRole | EC2 instance role | Attached with above policy         |

### Access Permission Details

- Details under confirmation

## CLI Access Methods (Within EC2 / SSM Session)

### Prerequisites

- Connected to EC2 instance (i-06c328e7748bd5dda) via SSM session
- IAM role CommentNowEC2SSMRole is attached
- AWS CLI is installed and configured

### Basic Operation Commands

#### List Files in Bucket

```bash
aws s3 ls s3://commentnow-app-storage --region ap-northeast-1
```

#### List Files by Directory

```bash
# Files in uploads directory
aws s3 ls s3://commentnow-app-storage/uploads/ --region ap-northeast-1

# Files in logs directory
aws s3 ls s3://commentnow-app-storage/logs/ --region ap-northeast-1
```

#### File Upload

```bash
# Single file upload
aws s3 cp ./localfile.txt s3://commentnow-app-storage/uploads/localfile.txt --region ap-northeast-1

# Upload entire directory
aws s3 cp ./local-directory/ s3://commentnow-app-storage/uploads/ --recursive --region ap-northeast-1

# Upload with metadata
aws s3 cp ./image.jpg s3://commentnow-app-storage/uploads/image.jpg \
  --metadata "content-type=image/jpeg,uploaded-by=app" \
  --region ap-northeast-1
```

#### File Download

```bash
# Single file download
aws s3 cp s3://commentnow-app-storage/uploads/localfile.txt ./downloaded.txt --region ap-northeast-1

# Download entire directory
aws s3 cp s3://commentnow-app-storage/uploads/ ./local-backup/ --recursive --region ap-northeast-1
```

#### File Deletion

```bash
# Single file deletion
aws s3 rm s3://commentnow-app-storage/uploads/localfile.txt --region ap-northeast-1

# Delete entire directory
aws s3 rm s3://commentnow-app-storage/temp/ --recursive --region ap-northeast-1
```
