import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDWEed6mU8DkFOSiAxq44t7Ak8MNSTSzb4",
  authDomain: "practicacomplexivo-c45c0.firebaseapp.com",
  databaseURL: "https://practicacomplexivo-c45c0-default-rtdb.firebaseio.com",
  projectId: "practicacomplexivo-c45c0",
  storageBucket: "practicacomplexivo-c45c0.firebasestorage.app",
  messagingSenderId: "421523712789",
  appId: "1:421523712789:web:e76c51b9ca26e5bb5c571c"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()) 
  ]
};