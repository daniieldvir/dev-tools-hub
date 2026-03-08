import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Tool } from '../../../core/models/tool.model';

@Component({
  selector: 'app-tool-card',
  imports: [LucideAngularModule],
  templateUrl: './tool-card.html',
  styleUrl: './tool-card.scss',
})
export class ToolCardComponent {
  public tool = input<Tool>();
  public toolClicked = output<Tool>()


  public handleClick() {
    this.toolClicked.emit(this.tool()!)


  }
}
