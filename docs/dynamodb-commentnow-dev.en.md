# DynamoDB Documentation — commentnow-dev

## Overview

Stores main data for the CommentNow application (users, sessions, comments, etc.).
Table access is restricted to CommentNowEC2SSMRole only,
with other tables (e.g., circus-ad) completely blocked.

## Table Basic Information

| Item          | Content                                            |
| ------------- | -------------------------------------------------- |
| Table Name    | commentnow-dev                                     |
| Region        | ap-northeast-1                                     |
| Key Structure | Partition Key: PK (String) / Sort Key: SK (String) |
| Capacity Mode | -                                                  |
| Encryption    | -                                                  |
| Access Rights | -                                                  |

## Security Configuration

| Item                         | Content                                                       |
| ---------------------------- | ------------------------------------------------------------- |
| Access Control               | Only CommentNowEC2SSMRole has access permission               |
| Other Tables Block           | Other project tables (e.g., circus-ad) are completely blocked |
| Principle of Least Privilege | Only minimal necessary DynamoDB operation permissions granted |
| Audit Logs                   | -                                                             |

## CLI Access Methods (Within EC2 / SSM Session)

### 1. List Tables (Connection Verification)

```bash
aws dynamodb list-tables --region ap-northeast-1
```

**Expected Output:**

```json
{
	"TableNames": ["commentnow-dev"]
}
```

### 2. Put Item

```bash
aws dynamodb put-item \
  --table-name commentnow-dev \
  --item '{
    "PK": {"S": "YOUR_PARTITION_KEY"},
    "SK": {"S": "YOUR_SORT_KEY"},
    "attribute1": {"S": "value1"},
    "attribute2": {"S": "value2"}
  }' \
  --region ap-northeast-1
```

### 3. Get Item

```bash
aws dynamodb get-item \
  --table-name commentnow-dev \
  --key '{"PK": {"S": "YOUR_PARTITION_KEY"}, "SK": {"S": "YOUR_SORT_KEY"}}' \
  --region ap-northeast-1
```

### 4. Query (Partition Key Specified)

```bash
aws dynamodb query \
  --table-name commentnow-dev \
  --key-condition-expression "PK = :pk" \
  --expression-attribute-values '{":pk": {"S": "YOUR_PARTITION_KEY"}}' \
  --region ap-northeast-1
```

### 5. Scan (Search All Items)

```bash
aws dynamodb scan \
  --table-name commentnow-dev \
  --limit 10 \
  --region ap-northeast-1
```

## Access Rights Details

### Policy Details

- Details under confirmation
