import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions'
import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator';
import AppWithRedux from '../AppWithRedux';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   is: { action: 'clicked'},
  // },
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  // args: {
  //   isDone: true,
  //   title: "Task title"
  // },
};

// export const TaskINotDoneStory: Story = {
//   // More on args: https://storybook.js.org/docs/react/writing-stories/args
//   args: {
//     isDone: false,
//     title: "Task title"
//   },
// };


