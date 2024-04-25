import boto3
import random
import string

def generate_random_password(length=12):
    #Generating random password
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for i in range(length))

def create_users_in_cognito(userpool_id, num_users, user_type):
    cognito_client = boto3.client('cognito-idp', region_name='your-region')

    for i in range(num_users):
        username = f'user{i+1}@example.com' 
        temp_password = generate_random_password()

        try:
            response = cognito_client.admin_create_user(
                UserPoolId=userpool_id,
                Type = user_type,
                Username=username,
                TemporaryPassword=temp_password,
                UserAttributes=[
                    {
                        'Name': 'email',
                        'Value': username,
                        'Type': user_type
                    },
                ],
                DesiredDeliveryMediums=['EMAIL']
            )
            print(f"User {username} created successfully.")
            print(f"Temporary Password: {temp_password}")
        except Exception as e:
            print(f"Error creating user {username}: {e}")

userpool_id = 'pool_id'
num_users = 10

create_users_in_cognito(userpool_id, num_users)
