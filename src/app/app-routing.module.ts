import { TeamComponent } from './team/team.component';
import { RecipesComponent } from './recipes/recipes.component';
import { BlogComponent } from './blog/blog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '',  component: HomepageComponent},
  { path: 'homepage', component: HomepageComponent },
  { path: 'blog', component: BlogComponent },
  // { path: 'recipes', component : RecipesComponent },
  { path: 'about', component : AboutComponent},
  { path: 'team', component: TeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
