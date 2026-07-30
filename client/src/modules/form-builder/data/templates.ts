export const formTemplates = [
  {
    id: 'registration',
    name: 'Registration',
    fields: [
      { type: 'text', label: 'First Name', required: true },
      { type: 'text', label: 'Last Name', required: true },
      { type: 'email', label: 'Email Address', required: true },
      { type: 'password', label: 'Password', required: true },
      { type: 'password', label: 'Confirm Password', required: true }
    ]
  },
  {
    id: 'survey',
    name: 'Survey',
    fields: [
      { type: 'dropdown', label: 'How did you hear about us?', required: true, defaultValue: 'Search Engine' },
      { type: 'rating', label: 'How would you rate your experience?', required: true },
      { type: 'textarea', label: 'Any additional comments?' },
      { type: 'radio', label: 'Would you recommend us to a friend?', required: true }
    ]
  },
  {
    id: 'contact',
    name: 'Contact Form',
    fields: [
      { type: 'text', label: 'Full Name', required: true },
      { type: 'email', label: 'Email Address', required: true },
      { type: 'text', label: 'Subject', required: false },
      { type: 'textarea', label: 'Message', required: true }
    ]
  },
  {
    id: 'feedback',
    name: 'Feedback',
    fields: [
      { type: 'rating', label: 'Product Satisfaction Rating', required: true },
      { type: 'checkbox', label: 'What features do you use the most?' },
      { type: 'textarea', label: 'What can we improve?' },
      { type: 'email', label: 'Email (Optional)', required: false }
    ]
  },
  {
    id: 'leave',
    name: 'Leave Application',
    fields: [
      { type: 'text', label: 'Employee Name', required: true },
      { type: 'dropdown', label: 'Leave Type', required: true },
      { type: 'date', label: 'Start Date', required: true },
      { type: 'date', label: 'End Date', required: true },
      { type: 'textarea', label: 'Reason for Leave', required: true }
    ]
  }
];
