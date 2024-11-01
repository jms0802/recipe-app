'use client';
import styles from './create.module.css';
import RecipeForm from '@/components/forms/RecipeForm';
import { useState } from 'react';

export default function Create() {
    return (
        <div className={styles.createContainer}>
            <div className={styles.createHeader}>
                <h1>레시피 추가</h1>
            </div>
            <div className={styles.createForm}>
                <RecipeForm/>
            </div>
        </div>
    );
}