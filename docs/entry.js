
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/App.js';
reactComponents['App'] = Component0;

import Component1 from '../src/components/reusables/BigLoadingAbsolute.js';
reactComponents['BigLoadingAbsolute'] = Component1;

import Component2 from '../src/components/reusables/BigLoadingCentered.js';
reactComponents['BigLoadingCentered'] = Component2;

import Component3 from '../src/components/reusables/DownloadElement.js';
reactComponents['DownloadElement'] = Component3;

import Component4 from '../src/components/reusables/EditSymbol.js';
reactComponents['EditSymbol'] = Component4;

import Component5 from '../src/components/ModalRoot/ModalRoot.js';
reactComponents['ModalRoot'] = Component5;

import Component6 from '../src/components/reusables/navbar/NavDropdown.js';
reactComponents['NavDropdown'] = Component6;

import Component7 from '../src/components/reusables/navbar/NavItem.js';
reactComponents['NavItem'] = Component7;

import Component8 from '../src/components/reusables/navbar/NavLinkSecondary.js';
reactComponents['NavLinkSecondary'] = Component8;

import Component9 from '../src/components/reusables/navbar/NotificationItem.js';
reactComponents['NotificationItem'] = Component9;

import Component10 from '../src/components/performance/OptimizedComponent.js';
reactComponents['OptimizedComponent'] = Component10;

import Component11 from '../src/components/performance/OptimizedPureComponent.js';
reactComponents['OptimizedPureComponent'] = Component11;

import Component12 from '../src/components/performance/Reload.js';
reactComponents['Reload'] = Component12;

import Component13 from '../src/components/reusables/SmallLoading.js';
reactComponents['SmallLoading'] = Component13;

import Component14 from '../src/components/ToastRoot/ToastRoot.js';
reactComponents['ToastRoot'] = Component14;

import Component15 from '../src/components/reusables/UserPreview.js';
reactComponents['UserPreview'] = Component15;

import Component16 from '../src/views/ClassroomRouter/components/ClassroomMenu/ClassroomMenu.js';
reactComponents['ClassroomMenu'] = Component16;

import Component17 from '../src/views/ClassroomRouter/components/ClassroomMenu/components/ClassroomMenuUserActions.js';
reactComponents['ClassroomMenuUserActions'] = Component17;

import Component18 from '../src/views/ClassroomRouter/ClassroomRouter.js';
reactComponents['ClassroomRouter'] = Component18;

import Component19 from '../src/views/ClassroomRouter/views/CourseRouter/views/CourseMain/CourseMain.js';
reactComponents['CourseMain'] = Component19;

import Component20 from '../src/views/ClassroomRouter/views/CourseRouter/views/CourseMain/components/CourseEnrollForm.js';
reactComponents['CourseEnrollForm'] = Component20;

import Component21 from '../src/views/ClassroomRouter/views/CourseRouter/views/CourseMain/components/InvitedTeacherInfo.js';
reactComponents['InvitedTeacherInfo'] = Component21;

import Component22 from '../src/views/ClassroomRouter/views/CourseRouter/views/CourseMain/components/OpenCourseInfo.js';
reactComponents['OpenCourseInfo'] = Component22;

import Component23 from '../src/views/ClassroomRouter/views/CourseRouter/CourseRouter.js';
reactComponents['CourseRouter'] = Component23;

import Component24 from '../src/views/ClassroomRouter/views/CourseRouter/components/CourseTabs.js';
reactComponents['CourseTabs'] = Component24;

import Component25 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/EditContent.js';
reactComponents['EditContent'] = Component25;

import Component26 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/components/EditContentActions.js';
reactComponents['EditContentActions'] = Component26;

import Component27 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/components/EditContentRoot/EditContentRoot.js';
reactComponents['EditContentRoot'] = Component27;

import Component28 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/components/EditContentRoot/components/EditContentSection.js';
reactComponents['EditContentSection'] = Component28;

import Component29 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/components/EditContentRoot/components/EditContentEntry.js';
reactComponents['EditContentEntry'] = Component29;

import Component30 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/components/EntryEditor/EntryEditor.js';
reactComponents['EntryEditor'] = Component30;

import Component31 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/components/EntryEditor/components/FileEntryEditor.js';
reactComponents['FileEntryEditor'] = Component31;

import Component32 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/components/EntryEditor/components/ForumEntryEditor.js';
reactComponents['ForumEntryEditor'] = Component32;

import Component33 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/components/EntryEditor/components/TextEntryEditor.js';
reactComponents['TextEntryEditor'] = Component33;

import Component34 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditContent/components/SectionEditor.js';
reactComponents['SectionEditor'] = Component34;

import Component35 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditExercises/EditExercises.js';
reactComponents['EditExercises'] = Component35;

import Component36 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditExercises/components/EditExercisesActions.js';
reactComponents['EditExercisesActions'] = Component36;

import Component37 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditExercises/components/ExerciseContainer.js';
reactComponents['ExerciseContainer'] = Component37;

import Component38 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditExercises/components/ExerciseEditor/ExerciseEditor.js';
reactComponents['ExerciseEditor'] = Component38;

import Component39 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditExercises/components/ExerciseEditor/components/MultipleChoiceTask.js';
reactComponents['MultipleChoiceTask'] = Component39;

import Component40 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditExercises/components/ExerciseEditor/components/OneChoiceTask.js';
reactComponents['OneChoiceTask'] = Component40;

import Component41 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditExercises/components/ExerciseEditor/components/TaskChoiceOption.js';
reactComponents['TaskChoiceOption'] = Component41;

import Component42 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditExercises/components/ExerciseEditor/components/TaskListItem.js';
reactComponents['TaskListItem'] = Component42;

import Component43 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditExercises/components/ExerciseEditor/components/TextTask.js';
reactComponents['TextTask'] = Component43;

import Component44 from '../src/views/ClassroomRouter/views/CourseRouter/views/EditInfo.js';
reactComponents['EditInfo'] = Component44;

import Component45 from '../src/views/ClassroomRouter/views/CourseRouter/components/EditorHelp.js';
reactComponents['EditorHelp'] = Component45;

import Component46 from '../src/views/ClassroomRouter/views/CourseRouter/components/EnrolledRoute.js';
reactComponents['EnrolledRoute'] = Component46;

import Component47 from '../src/views/ClassroomRouter/views/CourseRouter/components/FirstTimeInfo.js';
reactComponents['FirstTimeInfo'] = Component47;

import Component48 from '../src/views/ClassroomRouter/views/CourseRouter/components/TeacherRoute.js';
reactComponents['TeacherRoute'] = Component48;

import Component49 from '../src/views/ClassroomRouter/views/CourseList/CourseList.js';
reactComponents['CourseList'] = Component49;

import Component50 from '../src/views/ClassroomRouter/views/CourseList/components/CollapsibleCourseList.js';
reactComponents['CollapsibleCourseList'] = Component50;

import Component51 from '../src/views/ClassroomRouter/views/CourseList/components/CourseListItem.js';
reactComponents['CourseListItem'] = Component51;

import Component52 from '../src/views/ClassroomRouter/views/CourseList/components/MainList.js';
reactComponents['MainList'] = Component52;

import Component53 from '../src/views/ClassroomRouter/views/CourseList/components/StudentList.js';
reactComponents['StudentList'] = Component53;

import Component54 from '../src/views/ClassroomRouter/views/CourseList/components/TeacherList.js';
reactComponents['TeacherList'] = Component54;

import Component55 from '../src/views/ClassroomRouter/views/CreateCourse/CreateCourse.js';
reactComponents['CreateCourse'] = Component55;

import Component56 from '../src/views/ClassroomRouter/views/Dashboard/Dashboard.js';
reactComponents['Dashboard'] = Component56;

import Component57 from '../src/views/ClassroomRouter/views/Dashboard/components/ChooseDashboardFilterCourses.js';
reactComponents['ChooseDashboardFilterCourses'] = Component57;

import Component58 from '../src/views/ClassroomRouter/views/Dashboard/components/DashboardFilter.js';
reactComponents['DashboardFilter'] = Component58;

import Component59 from '../src/views/ClassroomRouter/views/Dashboard/components/DashboardNews/DashboardNews.js';
reactComponents['DashboardNews'] = Component59;

import Component60 from '../src/views/ClassroomRouter/views/Dashboard/components/DashboardNews/components/DashboardNewsEntry.js';
reactComponents['DashboardNewsEntry'] = Component60;

import Component61 from '../src/views/ClassroomRouter/views/MainClassroom.js';
reactComponents['MainClassroom'] = Component61;

import Component62 from '../src/views/ClassroomRouter/views/SearchCourses/SearchCourses.js';
reactComponents['SearchCourses'] = Component62;

import Component63 from '../src/views/ClassroomRouter/views/SearchCourses/components/CourseSearchItem.js';
reactComponents['CourseSearchItem'] = Component63;

import Component64 from '../src/views/ClassroomRouter/views/UserRouter/views/EditUser/EditUser.js';
reactComponents['EditUser'] = Component64;

import Component65 from '../src/views/ClassroomRouter/views/UserRouter/views/EditUser/components/DeleteUserDialog.js';
reactComponents['DeleteUserDialog'] = Component65;

import Component66 from '../src/views/ClassroomRouter/views/UserRouter/views/EditUser/components/EditUserBasicData.js';
reactComponents['EditUserBasicData'] = Component66;

import Component67 from '../src/views/ClassroomRouter/views/UserRouter/views/EditUser/components/EditUserHiddenFields/EditUserHiddenFields.js';
reactComponents['EditUserHiddenFields'] = Component67;

import Component68 from '../src/views/ClassroomRouter/views/UserRouter/views/EditUser/components/EditUserHiddenFields/components/AvailableFieldsDroppable.js';
reactComponents['AvailableFieldsDroppable'] = Component68;

import Component69 from '../src/views/ClassroomRouter/views/UserRouter/views/EditUser/components/EditUserHiddenFields/components/FieldEntityDraggable.js';
reactComponents['FieldEntityDraggable'] = Component69;

import Component70 from '../src/views/ClassroomRouter/views/UserRouter/views/EditUser/components/EditUserHiddenFields/components/HiddenFieldsDroppable.js';
reactComponents['HiddenFieldsDroppable'] = Component70;

import Component71 from '../src/views/ClassroomRouter/views/UserRouter/views/EditUser/components/EditUserPhoto.js';
reactComponents['EditUserPhoto'] = Component71;

import Component72 from '../src/views/ClassroomRouter/views/UserRouter/views/User/User.js';
reactComponents['User'] = Component72;

import Component73 from '../src/views/ClassroomRouter/views/UserRouter/views/User/components/UserBasicInfoAndActions.js';
reactComponents['UserBasicInfoAndActions'] = Component73;

import Component74 from '../src/views/ClassroomRouter/views/UserRouter/views/User/components/UserClassroomContent.js';
reactComponents['UserClassroomContent'] = Component74;

import Component75 from '../src/views/ClassroomRouter/views/UserRouter/UserRouter.js';
reactComponents['UserRouter'] = Component75;

import Component76 from '../src/views/PublicRouter/views/ActivateAccount/ActivateAccount.js';
reactComponents['ActivateAccount'] = Component76;

import Component77 from '../src/views/PublicRouter/views/ForgotPassword/ForgotPassword.js';
reactComponents['ForgotPassword'] = Component77;

import Component78 from '../src/views/PublicRouter/views/Home/Home.js';
reactComponents['Home'] = Component78;

import Component79 from '../src/views/PublicRouter/views/Home/components/NewsFeed.js';
reactComponents['NewsFeed'] = Component79;

import Component80 from '../src/views/PublicRouter/views/InviteSignup.js';
reactComponents['InviteSignup'] = Component80;

import Component81 from '../src/views/PublicRouter/components/PublicMenu.js';
reactComponents['PublicMenu'] = Component81;

import Component82 from '../src/views/PublicRouter/PublicRouter.js';
reactComponents['PublicRouter'] = Component82;

import Component83 from '../src/views/PublicRouter/views/ResetPassword/ResetPassword.js';
reactComponents['ResetPassword'] = Component83;

import Component84 from '../src/views/PublicRouter/views/Signin.js';
reactComponents['Signin'] = Component84;

import Component85 from '../src/views/PublicRouter/views/Signup.js';
reactComponents['Signup'] = Component85;

import Component86 from '../src/views/PublicRouter/components/SignupComponent/SignupComponent.js';
reactComponents['SignupComponent'] = Component86;

import Component87 from '../src/views/PublicRouter/components/SignupComponent/components/SignupForm.js';
reactComponents['SignupForm'] = Component87;

import Component88 from '../src/views/components/ActivationMessage/ActivationMessage.js';
reactComponents['ActivationMessage'] = Component88;

import Component89 from '../src/views/components/Signin/Signin.js';
reactComponents['Signin'] = Component89;