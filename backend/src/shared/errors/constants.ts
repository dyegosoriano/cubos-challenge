export const errors = {
  pagination_required: { message: 'Pagination values are mandatory.' },
  pagination: 'The value 0 is not accepted in pagination.',
  pagination_positive: 'Enter only positive values.',
  pagination_int: 'Enter only integer values.',

  boolean_invalid: { message: "You need to enter a 'true' or 'false' value." },

  required_field: { message: 'Required field' },

  url: 'Invalid URL!',
  id: 'Invalid ID!',

  user: {
    password_regex: 'Password must contain at least one number or letter',
    password_required: { message: 'Password required.' },
    password_max: 'Password must be at most 16 characters.',
    password_min: 'Password must be at least 8 characters.',

    email_required: { message: 'Required mail.' },
    email_max: 'Email must be at most 100 characters',
    email_min: 'Email must be at least 6 characters',
    email: 'Invalid mail!',

    name_required: { message: 'Required name.' },
    name_max: 'Name must be at most 100 characters',
    name_min: 'Name must be at least 3 characters'
  },

  movie: {
    title_max: 'Title must be at most 255 characters.',
    title_required: { message: 'Title is required.' },
    title_min: 'Title must be at least 1 character.',

    original_name_max: 'Original name must be at most 255 characters.',
    original_name_required: { message: 'Original name is required.' },

    synopsis_max: 'Synopsis must be at most 1000 characters.',

    duration_positive: 'Duration must be a positive number.',
    duration_required: { message: 'Duration is required.' },

    popularity_required: { message: 'Popularity is required.' },
    popularity_min: 'Popularity must be at least 0.',
    popularity_max: 'Popularity must be at most 10.',

    votes_positive: 'Votes must be a positive number.',
    votes_required: { message: 'Votes is required.' },

    release_required: { message: 'Release date is required.' },
    release_invalid: 'Invalid release date.',

    language_required: { message: 'Language is required.' },
    language_invalid: 'Invalid language.',

    genres_required: { message: 'At least one genre is required.' },
    genres_invalid: 'Invalid genre.',

    status_required: { message: 'Status is required.' },
    status_invalid: 'Invalid status.',

    revenue_positive: 'Revenue must be a positive number.',
    budget_positive: 'Budget must be a positive number.',
    profit_number: 'Profit must be a valid number.'
  }
}
