import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {CardGameComponent} from './card-game.component';


const meta: Meta<CardGameComponent> = {
  component: CardGameComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [],
      providers: [
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<CardGameComponent>;

export const Base: Story = {};
