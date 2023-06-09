import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'
export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'firstName',
      title: 'Firstname',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[a-zA-Z\-]+$/, {
          name: 'FirstName',
          invert: false,
        }).error('invalid name'),
    }),
    defineField({
      name: 'lastName',
      title: 'LastName',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[a-zA-Z\-]+$/, {
          name: 'LastName',
          invert: false,
        }),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email().error('enter a valid email'),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'birthDay',
      title: 'Date of birth',
      type: 'date',
    }),
    defineField({
      name: 'website',
      title: 'Website url',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'instagram url',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'facebook url',
      type: 'url',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'string',
    }),
    defineField({
      name: 'verified',
      title: 'Verified Email?',
      type: 'boolean',
    }),
    defineField({
      title: 'Role',
      name: 'role',
      type: 'string',
      initialValue: 'user',
      options: {
        list: [
          {title: 'Admin', value: 'admin'},
          {title: 'Editor', value: 'editor'},
          {title: 'User', value: 'user'},
        ],
      },
    }),
  ],
})
