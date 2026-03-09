import { Injectable } from '@angular/core';
import toolsData from '../../../../../public/assets/data/tools.json';
import { Tool } from '../../models/tool.model';

@Injectable({
  providedIn: 'root',
})
export class ToolsServiceTs {
  public tools: Tool[] = toolsData.map((tool) => ({
    ...tool,
  })) as Tool[];

  public categories: string[] = ['all', ...Array.from(new Set(this.tools.map((t) => t.category)))];
}
