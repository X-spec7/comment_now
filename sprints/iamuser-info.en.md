# IAM Configuration Notes (for SSM Access)

## Overview

To enable developers to securely access EC2 instances, we use AWS Systems Manager (SSM Session Manager) instead of SSH. Authentication via IAM user + MFA enables keyless and secure connections.

## IAM Role Configuration (CommentNowEC2SSMRole)

### Overview

CommentNow development EC2 instance access, monitoring, and data operations with minimal privileges for secure execution.

| Item            | Content                                                 |
| --------------- | ------------------------------------------------------- |
| Role Name       | CommentNowEC2SSMRole                                    |
| Purpose         | Secure access from EC2 to SSM, S3, DynamoDB, CloudWatch |
| Target Instance | i-06c328e7748bd5dda (Ubuntu)                            |

### Attached Policies

| Policy Name                  | Purpose                         | Access Scope                       |
| ---------------------------- | ------------------------------- | ---------------------------------- |
| AmazonSSMManagedInstanceCore | SSM session connection to EC2   | SSM / EC2 management               |
| CloudWatchAgentServerPolicy  | CloudWatch metrics transmission | CloudWatch Agent                   |
| -                            | DynamoDB operations             | commentnow-dev table only          |
| -                            | S3 operations                   | commentnow-app-storage bucket only |

## IAM User Configuration

| Item               | Content                                        |
| ------------------ | ---------------------------------------------- |
| Username           | arktecher                                      |
| Authentication     | AWS Console / CLI login (MFA enabled)          |
| Group              | CommentNowSSMAccess                            |
| Custom Policy Name | SSMAccessBasicPolicyForCommentNow              |
| Policy Assignment  | Assigned at group level (not directly to user) |

## Custom Policy Content (SSMAccessBasicPolicyForCommentNow)

- Details under confirmation

## Connection Verification and Session Management

### 1. Check Instance List

Verify instances registered with SSM.
If `PingStatus: Online` is displayed, the connection is possible.

```bash
aws ssm describe-instance-information --region ap-northeast-1
```

**Expected Output:**

- Details under confirmation

### 2. Start Session

Access the shell directly without SSH.

```bash
aws ssm start-session --target i-06c328e7748bd5dda --region ap-northeast-1
```
