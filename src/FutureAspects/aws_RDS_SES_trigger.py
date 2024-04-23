import boto3
import pymysql

# Connect to RDS MySQL database
conn = pymysql.connect(
    host='db-URL',
    user='UserName',
    password='Password',
    database='db-Name'
)

def lambda_handler(event, context):
    
    # Check for new data in the database
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students_items ORDER BY date DESC; ")
    new_data = cursor.fetchone()
    
    if new_data:
        # Send email notification using SES
        ses_client = boto3.client('ses', region_name='your-region')
        recipient_email = 'recipient-email@example.com'
        subject = 'New data inserted into database'
        body = 'New data has been inserted into the database: {}'.format(new_data)
        
        response = ses_client.send_email(
            Destination={'ToAddresses': [recipient_email]},
            Message={'Subject': {'Data': subject}, 'Body': {'Text': {'Data': body}}}
        )
        
        print("Email notification sent successfully")
    else:
        print("No new data found")
    
    conn.close()
