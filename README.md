# Base

[![npm version](https://badge.fury.io/js/base-api-io.svg)](https://badge.fury.io/js/base-api-io)

Node.js client for the [Base API](https://www.base-api.io) service, with it you
can manage authentication, email sending, files and images of your application.

## Installation

Add the dependency to your `package.json` with:

`yarn add base-api-io`

or

`npm install base-api-io --save`

## Usage

1. Sign up on [www.base-api.io](https://www.base-api.io) and create an
   application and copy its access token.

2. Require the package:

   ```javascript
   const { Client } = require("base-api-io")
   ```

3. Create a client:

   ```javascript
   client =
     Client.new("your_access_token")
   ```

All functions return promises so you can chain them or just `await` them.

### Sending email

Using the `emails` endpoint on the client you can send emails:

```javascript
// Sending an email
email =
  await client.emails.send(
    "Subject: Test Email"
    "from@example.com",
    "to@example.com",
    "<b>Html message</b>",
    "Text message")
```

### Users

Using the `users` endpoint  on the client you can create / get or delete users:

```javascript
// Listing users
users = await client.users.list()
users.items          // The array of users
users.metadata.count //The metadata object containing the total count

// Create a user with email / password
user =
  await client.users.create(
    "test@user.com",
    "12345",
    "12345",
    { age: 32 })

// Get a users details by the id
user =
  await client.users.get("user_id")

// Update a users email / custom data
user =
  await client.users.update(
    "user_id",
    "test@user.com",
    { age: 32 })

// Delete a user by id
user =
  await client.users.delete("user_id")
```

### Sessions

Using the `sessions` endpoint on the client you can authenticate a user.

```javascript
// Create a user with email / password
user =
  await client.sessions.authenticate(
    "test@user.com",
    "12345")
```

### Forgot Password Flow

Using the `passwords` endpoint on the client you can perform a forgot password flow.

```javascript
// Create an forgot password token for the user with the given email address.
token =
  client.passwords.forgot_password("test@user.com")

// Using that token set a new password.
user =
  client.passwords.set_password(
    token.forgot_password_token,
    "123456",
    "123456")
```

### Files

Using the `files` endpoint on the client you can create / get / delete or download files:

```javascript
// Listing files
files = await client.files.list()
files.items          // The array of files
files.metadata.count //The metadata object containing the total count

// Create a file
file =
  await client.files.create({
    content_type: "text/plain",
    file: "/path/to/file",
  })

// Get a file by id
file =
  await client.files.get("file_id")

// Delete a file by id
file =
  await client.files.delete("file_id")

// Get a download URL to the file by id
url =
  await client.files.downloadUrl("file_id")

// Download the file by id into a Buffer
buffer =
  await client.files.download("file_id")
```

### Images

Using the `images` endpoint on the client you can create / get / delete or process images:

```javascript
// Listing images
images = await client.images.list()
images.items          // The array of images
images.metadata.count //The metadata object containing the total count

// Create an image
image =
  await client.images.create({
    file: "/path/to/image.png",
    content_type: "image/png"
  })

// Get a image by id
image =
  await client.images.get("image_id")

// Delete a image by id
image =
  await client.images.delete("image_id")

// Get a link to a prcessed version (crop & resize) of the image by id
url =
  await client.images.imageUrl("image_id",
    crop: {width: 100, height: 100, top: 0, left: 0},
    resize: {width: 100, height: 100},
    format: "jpg",
    quality: 10)
```

### Mailing Lists

A project can have many mailing lists which can be managed from the interface.

The `mailingLists` endpoint allows you to programatically subscribe / unsubscribe
emails to a mailing list and send emails to all subscribes using a single call.

```javascript
// List mailing lists
lists = await client.mailing_lists.list(page: 1, per_page: 10)
lists.items     // The array of mailing lists
lists.metadata  // The metadata object containing the total count

// Get a mailing list by id
list =
  await client.mailing_lists.get('list_id')

// Subscribe an email to a mailing list.
list =
  await client.mailingLists.subscribe('mailing_list_id', 'test@user.com')

// Unsubscribe an email from a mailing list.
list =
  await client.mailingLists.unsubscribe('mailing_list_id', 'test@user.com')

// Get a public unsubscribe url for the given mailing list and email which
// when click unsubscribes a user from the mailing list and redirects to the
// unsubscribe_redirect_url of the list.
url =
  client.mailingLists.unsubscribeUrl('mailing_list_id', 'test@user.com')

// Send the same email to all of the subscribers
results =
  await client.mailingLists.send(
      'mailing_list_id',
      'subject',
      'from@example.com',
      'HTML',
      'Text')
```

### Forms

A project can have many forms and those form can have many submissions.

The `forms` endpoint allows you to programatically create, submit and manage forms.

```javascript
// List forms
forms = await client.forms.list(1, 10)
forms.items     // The array of forms
forms.metadata  // The metadata object containing the total count

// Create a form
form =
  await client.forms.create('Form')

// Get a form
form =
  await client.forms.get('form_id')

// Delete a form (and it's submissions)
form =
  await client.forms.delete('form_id')

// Submit a form
submission =
  await client.forms.submit('form_id', { key: 'value' })

// List form submissions
submissions = await client.forms.submissions('form_id', 1, 10)
submissions.items     // The array of forms submissions
submissions.metadata  // The metadata object containing the total count

// Get a submission
submission =
  await client.forms.get_submission('form_id', 'submission_id')

// Delete a submission
submission =
  await client.forms.delete_submission('form_id', 'submission_id')
```

## Development

This library uses [Needle](https://www.npmjs.com/package/needle), you can run the CI tasks locally with `make`.

## Contributing

1. Fork it (<https://github.com/base-api-io/base-node/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Contributors

- [Gusztav Szikszai](https://github.com/gdotdesign) - creator and maintainer
