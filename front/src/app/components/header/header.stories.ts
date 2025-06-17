import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {HeaderComponent} from './header.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LoginButtonComponent} from '../login-button/login-button.component';
import {RegisterButtonComponent} from '../register-button/register-button.component';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        LoginButtonComponent,
        RegisterButtonComponent
      ],
      declarations: [],
      providers: [
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<HeaderComponent>;

export const Base: Story = {};
