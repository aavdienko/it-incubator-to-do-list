import type { ComponentMeta, ComponentStory, Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions'
import { Task } from '../components/Task';
import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { TaskType } from '../components/ToDoListWithRedux';




// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: 'Todolist/Task',
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   is: { action: 'clicked'},
  // },
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    isDone: true,
    title: "Task title"
  },
};

export const TaskINotDoneStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    isDone: false,
    title: "Task title"
  },
};

