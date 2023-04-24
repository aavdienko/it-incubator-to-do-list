import type { Meta, StoryObj } from '@storybook/react';
import { SuperInput } from '../components/SuperInput';
import { action } from '@storybook/addon-actions'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SuperInput> = {
  title: 'Todolist/SuperInput',
  component: SuperInput,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    callBack: { action: 'clicked'},
  },
};

export default meta;
type Story = StoryObj<typeof SuperInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const SuperInputStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    callBack: action('The task/todolist was added')
  },
};
