import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LoginButtonComponent} from '../login-button/login-button.component';
import {RegisterButtonComponent} from '../register-button/register-button.component';
import {LoginFormComponent} from './login-form.component';

const meta: Meta<LoginFormComponent> = {
  component: LoginFormComponent,
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
type Story = StoryObj<LoginFormComponent>;

export const Base: Story = {};
