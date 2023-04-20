import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";

export const MATERIAL_MODULES = [
    MatProgressBarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
]

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES,
    providers: [],
})
export class MaterialModule { }