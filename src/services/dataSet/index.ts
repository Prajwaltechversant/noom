

export const onBoardingData = [
    {
        section: 'Demographic Profile',

        screens: [
            {
                type: 'button',
                question: 'What is your weight loss goal?',
                key: 'weight',
                content: '',
                options: [
                    {
                        label: 'Lose 1-10 kg for good',
                        key: true,
                        value: '1-10'
                    },
                    {
                        label: 'Lose 11-20 kg for good',
                        key: true,
                        value: '11-20'
                    },
                    {
                        label: 'Maintain weight and get fit',
                        key: true,
                        value: 'fit'
                    },
                    {
                        label: 'I haven’t decided yet',
                        key: true,
                        value: null
                    },

                ]
            },

            {
                type: 'button',
                question: 'Which sex best describes you?',
                content: 'Sex and hormones impact how our bodies metabolize food.',
                key: 'sex',
                options: [
                    {
                        label: 'Male',
                        key: true,
                        value: 'male'
                    },
                    {
                        label: 'Female',
                        key: true,
                        value: 'female'
                    },
                    {
                        label: 'Intersex',
                        key: true,
                        value: 'intersex'
                    },


                ]
            },

            {
                type: 'radio',
                question: 'What gender do you identify with?',
                content: 'People may identify themselves with more than just sex and hormones.',
                key: 'gender',
                options: [
                    {
                        label: 'Man',
                        key: true,
                        value: 'man'
                    },
                    {
                        label: 'woman',
                        key: true,
                        value: 'woman'
                    },
                    {
                        label: 'Non-binary',
                        key: true,
                        value: 'intersex'
                    }
                    ,
                    {
                        label: 'Prefer not to say',
                        key: true,
                        value: null
                    },


                ]
            },
            {
                type: 'button',
                question: 'Are you pregnant?',
                content: 'People may identify themselves with more than just sex and hormones.',
                key: 'pregnant',
                options: [
                    {
                        label: 'Yes',
                        key: false,
                        value: 'yes'
                    },
                    {
                        label: 'No',
                        key: true,
                        value: 'no'
                    },

                ]
            },
            {
                type: 'button',
                question: 'What is your age?',
                content: '',
                key: 'age',
                options: [
                    {
                        label: '20s',
                        key: true,
                        value: '20'
                    },
                    {
                        label: '30s',
                        key: true,
                        value: '30'
                    },
                    {
                        label: '40s',
                        key: true,
                        value: '40'
                    }
                    ,
                    {
                        label: '50s',
                        key: true,
                        value: '50'
                    },

                    {
                        label: '60+',
                        key: true,
                        value: '60',
                    },


                ]
            },

            {
                type: 'input',
                question: 'What’s your current height?',
                content: '',
                key: 'height',
            },

            {
                type: 'input',
                question: 'What’s your current weight?',
                content: 'We do not mean to pry, we just need to know so we can build a plan that is right for you.',
                key: 'height',
            },
            {
                type: 'checkbox',
                question: 'Are you at risk of any of the following?',
                content: '',
                key: 'risk',
                options: [
                    {
                        label: 'High Blood Pressure',
                        key: true,
                        value: 'bp'
                    },
                    {
                        label: 'Diabetes',
                        key: true,
                        value: 'Diabetes'
                    },
                    {
                        label: 'High Cholesterol',
                        key: true,
                        value: 'Cholesterol'
                    }
                    ,
                    {
                        label: 'none',
                        key: true,
                        value: null
                    },


                ]
            },

            {
                type: 'button',
                question: 'Do you have an active diagnosis of an eating disorder (e.g. bulimia, anorexia, or similar diagnosis)?',
                content: '',
                key: 'eating disorder',
                options: [
                    {
                        label: 'Yes',
                        key: false,
                        value: 'yes'
                    },
                    {
                        label: 'No',
                        key: true,
                        value: 'no'
                    },



                ]
            }

        ]
    },

    {
        section: 'Weight Loss Goals',
        screens: [
            {
                type: 'input',
                question: 'What is your ideal weight that you want to reach?',
                key: 'weight',
                content: '',
            },

            {
                type: 'date',
                question: 'Exciting! We will keep this important event in mind for your journey.',
                key: 'event',
                optional: true,
                content: '',
                options: [
                    {
                        label: 'Lose 1-10 kg for good',
                        key: true,
                        value: '1-10'
                    },
                    {
                        label: 'Lose 11-20 kg for good',
                        key: true,
                        value: '11-20'
                    },
                    {
                        label: 'Maintain weight and get fit',
                        key: true,
                        value: 'fit'
                    },
                    {
                        label: 'I haven’t decided yet',
                        key: true,
                        value: null
                    },

                ]
            },

        ]
    },


    {
        section: 'profile',
        screens: [
            {
                type: 'input',
                question: 'What is your preferred name?',
                key: 'name',
                content: '',
            },
            {
                type: 'input',
                question: 'What is your email, to see the result',
                key: 'email',
                content: '',

            },




        ]
    },

    {
        section: 'behavioral',
        screens: [
            {
                type: 'quiz',
                question: 'Achieving my weight goal...',
                key: 'weightgoal',
                content: '',
                options: [
                    {
                        label: 'Is important for progress in other areas of my life',
                        key: true,
                        value: '5'
                    },
                    {
                        label: 'Doesn’t affect other areas of my life',
                        key: true,
                        value: '4'
                    },
                ]
            },
            {
                type: 'quiz',
                question: 'I would love my body...',
                key: 'weightgoal',
                content: '',
                options: [
                    {
                        label: 'The same no matter my weight',
                        key: true,
                        value: '5'
                    },
                    {
                        label: 'More if I were to achieve my weight goal',
                        key: true,
                        value: '4'
                    },
                ]
            },
            {
                type:'yesno',
                question: 'Do you relate to the statement below?',
                key: 'weightgoal',
                content: 'My weight has affected my ability to socialize or engage with friends and family',
                img: 'https://buyflow-web-assets.noom.com/bfc2/media/brocolli-picnic.fa1506cdbfe882470fa8005d3cb7f774.webp',
                options: [
                    {
                        label: 'Yes',
                        key: true,
                        value: '1'
                    },
                    {
                        label: 'No',
                        key: true,
                        value: '0'
                    },
                ]
            },
        ]
    },
    // {
    //     section: 'weight loss profile',
    //     screens: [
    //         {
    //             type:'yesno',
    //             question: 'Do you relate to the statement below?',
    //             key: 'weightgoal',
    //             content: 'My weight has affected my ability to socialize or engage with friends and family',
    //             img: 'https://buyflow-web-assets.noom.com/bfc2/media/brocolli-picnic.fa1506cdbfe882470fa8005d3cb7f774.webp',
    //             options: [
    //                 {
    //                     label: 'The same no matter my weight',
    //                     key: true,
    //                     value: '5'
    //                 },
    //                 {
    //                     label: 'More if I were to achieve my weight goal',
    //                     key: true,
    //                     value: '4'
    //                 },
    //             ]
    //         },
    //     ]
    // },
]