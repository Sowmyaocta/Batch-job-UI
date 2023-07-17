export const activeJobsMockData:any = {
    "status": "SUCCESSFUL",
    "statusCode": 200,
    "statusDescription": "",
    "data": [
      {
        "jobDefinitionName": "aws-batch-job-definition",
        "jobDefinitionArn": "arn:aws:batch:us-east-1:065801525472:job-definition/aws-batch-job-definition:1",
        "revision": 1,
        "status": "ACTIVE",
        "type": "container",
        "schedulingPriority": null,
        "parameters": {},
        "retryStrategy": null,
        "containerProperties": {
          "image": "public.ecr.aws/amazonlinux/amazonlinux:latest",
          "vcpus": null,
          "memory": null,
          "command": [
            "echo",
            "hello world"
          ],
          "jobRoleArn": null,
          "executionRoleArn": "arn:aws:iam::065801525472:role/AWSBatchECSRole",
          "volumes": [],
          "environment": [],
          "mountPoints": [],
          "readonlyRootFilesystem": null,
          "privileged": null,
          "ulimits": [],
          "user": null,
          "instanceType": null,
          "resourceRequirements": [
            {
              "value": "1.0",
              "type": "VCPU"
            },
            {
              "value": "2048",
              "type": "MEMORY"
            }
          ],
          "linuxParameters": null,
          "logConfiguration": null,
          "secrets": [],
          "networkConfiguration": null,
          "fargatePlatformConfiguration": {
            "platformVersion": "LATEST"
          }
        },
        "timeout": null,
        "nodeProperties": null,
        "tags": {},
        "propagateTags": null,
        "platformCapabilities": [
          "FARGATE"
        ],
        "eksProperties": null,
        "containerOrchestrationType": "ECS"
      }
    ]
  }
  