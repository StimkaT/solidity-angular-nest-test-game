import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CreateGameFormComponent } from './create-game-form.component';

const meta: Meta<CreateGameFormComponent> = {
  component: CreateGameFormComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [],
      providers: [],
    }),
  ],
};
export default meta;
type Story = StoryObj<CreateGameFormComponent>;

export const Base: Story = {
  args: {
  },
  parameters: {
    docs: {
      canvas: {
        style: 'width: 500px; height: 200px; background: green;',
      },
    },
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `
        <div style="padding: 16px; width: 500px; height: 200px; background: rgb(68, 75, 76);">
          ${story().template}
        </div>
      `,
    }),
  ],
};
