# Setting Up EmailJS for Your Contact Form

To make your contact form fully functional, follow these steps to set up EmailJS:

## 1. Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for a free account
2. The free plan allows 200 emails/month which should be sufficient for most portfolio websites

## 2. Connect Your Email Service

1. In the EmailJS dashboard, go to "Email Services" and click "Add New Service"
2. Choose your preferred email provider (Gmail, Outlook, etc.)
3. Follow the authentication steps to connect your email account
4. Once connected, note down the **Service ID** (it will look something like "service_xxxxxxx")

## 3. Create an Email Template

1. Go to "Email Templates" and click "Create New Template"
2. Create a template with the following suggested structure:

```
Subject: {{subject}}

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

3. Add any additional styling or formatting you prefer
4. Save the template and note down the **Template ID** (it will look like "template_xxxxxxx")

## 4. Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (it will look like "XXXXXXXXXXXXXXXXXXXXXXX")

## 5. Update Your Code

Open `src/app/components/ContactSection.tsx` and replace the placeholder values with your actual IDs:

```typescript
const EMAILJS_SERVICE_ID = "service_xxxxxxx"; // Replace with your Service ID 
const EMAILJS_TEMPLATE_ID = "template_xxxxxxx"; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = "XXXXXXXXXXXXXXXXXXXXXXX"; // Replace with your Public Key
```

## 6. Initialize EmailJS (Important!)

Add the following initialization code in your `src/app/components/ContactSection.tsx` file, inside the `ContactSection` component, at the beginning of the function:

```typescript
// Initialize EmailJS
useEffect(() => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}, []);
```

## 7. Test Your Form

1. Start your development server
2. Navigate to the contact page
3. Fill out and submit the form
4. Check that you receive the email at your configured email address

If you encounter any issues, check the browser console for error messages and verify your EmailJS configuration. 