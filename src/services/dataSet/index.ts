

export const onBoardingData = [
    {
        section: 'Demographic Profile',
        id: 'DemographicProfile',
        screens: [
            {
                type: 'button',
                question: 'What is your weight loss goal?',
                key: 'weight',
                content: '',
                id: 'weight',
                options: [
                    {
                        label: 'Lose 1-10 kg for good',
                        key: true,
                        value: '1-10',
                        id: 1
                    },
                    {
                        label: 'Lose 11-20 kg for good',
                        key: true,
                        value: '11-20',
                        id: 2
                    },
                    {
                        label: 'Maintain weight and get fit',
                        key: true,
                        value: 'fit',
                        id: 3
                    },
                    {
                        label: 'I haven’t decided yet',
                        key: true,
                        value: null,
                        id: 4
                    },
                ]
            },
            {
                type: 'button',
                question: 'Which sex best describes you?',
                content: 'Sex and hormones impact how our bodies metabolize food.',
                key: 'sex',
                id: 'sex',
                options: [
                    {
                        label: 'Male',
                        key: true,
                        value: 'male',
                        id: 1
                    },
                    {
                        label: 'Female',
                        key: true,
                        value: 'female',
                        id: 2
                    },
                    {
                        label: 'Intersex',
                        key: true,
                        value: 'intersex',
                        id: 3
                    },


                ]
            },
            {
                type: 'radio',
                question: 'What gender do you identify with?',
                content: 'People may identify themselves with more than just sex and hormones.',
                key: 'gender',
                id: 'gender',
                options: [
                    {
                        label: 'Man',
                        key: true,
                        value: 'man',
                        id: 1
                    },
                    {
                        label: 'woman',
                        key: true,
                        value: 'woman',
                        id: 2
                    },
                    {
                        label: 'Non-binary',
                        key: true,
                        value: 'intersex',
                        id: 3
                    }
                    ,
                    {
                        label: 'Prefer not to say',
                        key: true,
                        value: null,
                        id: 4
                    },


                ]
            },
            {
                type: 'button',
                question: 'Are you pregnant?',
                content: 'People may identify themselves with more than just sex and hormones.',
                key: 'pregnant',
                id: 'pregnant',
                options: [
                    {
                        label: 'Yes',
                        key: false,
                        value: 'yes',
                        id: 1
                    },
                    {
                        label: 'No',
                        key: true,
                        value: 'no',
                        id: 2
                    },

                ]
            },
            {
                type: 'button',
                question: 'What is your age?',
                content: '',
                key: 'age',
                id: 'age',
                options: [
                    {
                        label: '20s',
                        key: true,
                        value: '20',
                        id: 1
                    },
                    {
                        label: '30s',
                        key: true,
                        value: '30',
                        id: 2
                    },
                    {
                        label: '40s',
                        key: true,
                        value: '40',
                        id: 3
                    }
                    ,
                    {
                        label: '50s',
                        key: true,
                        value: '50',
                        id: 4
                    },

                    {
                        label: '60+',
                        key: true,
                        value: '60',
                        id: 5
                    },


                ]
            },

            {
                type: 'input',
                question: 'What’s your current height?',
                content: '',
                key: 'height',
                id: 'height'
            },

            {
                type: 'input',
                question: 'What’s your current weight?',
                content: 'We do not mean to pry, we just need to know so we can build a plan that is right for you.',
                key: 'weight',
            },
            {
                type: 'checkbox',
                question: 'Are you at risk of any of the following?',
                content: '',
                key: 'risk',
                id: 'risk',
                options: [
                    {
                        label: 'High Blood Pressure',
                        key: true,
                        value: 'bp',
                        id: 1
                    },
                    {
                        label: 'Diabetes',
                        key: true,
                        value: 'Diabetes',
                        id: 2
                    },
                    {
                        label: 'High Cholesterol',
                        key: true,
                        value: 'Cholesterol',
                        id: 3
                    }
                    ,
                    {
                        label: 'none',
                        key: true,
                        value: null,
                        id: 4
                    },


                ]
            },

            {
                type: 'button',
                question: 'Do you have an active diagnosis of an eating disorder (e.g. bulimia, anorexia, or similar diagnosis)?',
                content: '',
                key: 'eating disorder',
                id: 'eatingdisorder',
                options: [
                    {
                        label: 'Yes',
                        key: false,
                        value: 'yes',
                        id: 1
                    },
                    {
                        label: 'No',
                        key: true,
                        value: 'no',
                        id: 2
                    },



                ]
            }

        ]
    },

    {
        section: 'Weight Loss Goals',
        id: 'WeightLossGoals',
        screens: [
            {
                type: 'input',
                question: 'What is your ideal weight that you want to reach?',
                key: 'weight',
                content: '',
                id: 'idealWeight'
            },

            {
                type: 'date',
                question: 'Exciting! We will keep this important event in mind for your journey.',
                key: 'event',
                optional: true,
                content: '',
                id: 'event',
                options: [
                    {
                        label: 'Lose 1-10 kg for good',
                        key: true,
                        value: '1-10',
                        id: 1
                    },
                    {
                        label: 'Lose 11-20 kg for good',
                        key: true,
                        value: '11-20',
                        id: 2
                    },
                    {
                        label: 'Maintain weight and get fit',
                        key: true,
                        value: 'fit',
                        id: 3
                    },
                    {
                        label: 'I haven’t decided yet',
                        key: true,
                        value: null,
                        id: 4
                    },

                ]
            },

        ]
    },


    {
        section: 'profile',
        id: 'profile',
        screens: [
            {
                type: 'input',
                question: 'What is your preferred name?',
                key: 'name',
                content: '',
                id: 'name'
            },
            {
                type: 'input',
                question: 'What is your email, to see the result',
                key: 'email',
                content: '',
                id: 'email'
            },
        ]
    },

    {
        section: 'behavioral',
        id: 'behavioral',
        screens: [
            {
                type: 'quiz',
                question: 'Achieving my weight goal...',
                key: 'weightgoal',
                content: '',
                id: 'weightgoal',
                options: [
                    {
                        label: 'Is important for progress in other areas of my life',
                        key: true,
                        value: '1',
                        id: 1
                    },
                    {
                        label: 'Doesn’t affect other areas of my life',
                        key: true,
                        value: '2',
                        id: 2
                    },
                ]
            },
            {
                type: 'quiz',
                question: 'I would love my body...',
                key: 'quiz',
                id: 'quiz1',
                content: '',
                options: [
                    {
                        label: 'The same no matter my weight',
                        key: true,
                        value: '5',
                        id: 1
                    },
                    {
                        label: 'More if I were to achieve my weight goal',
                        key: true,
                        value: '4',
                        id: 2
                    },
                ]
            },
            {
                type: 'yesno',
                question: 'Do you relate to the statement below?',
                key: 'psy',
                content: 'My weight has affected my ability to socialize or engage with friends and family',
                img: 'https://buyflow-web-assets.noom.com/bfc2/media/brocolli-picnic.fa1506cdbfe882470fa8005d3cb7f774.webp',
                id: 'psy1',
                options: [
                    {
                        label: 'Yes',
                        key: true,
                        value: '1',
                        id:1
                    },
                    {
                        label: 'No',
                        key: true,
                        value: '0',
                        id:2
                    },
                ]
            },
        ]
    },
    {
        section: 'weight loss profile',
        id:'weightlossprofile',
        screens: [
            {
                type: 'quiz',
                question: 'Do you relate to the statement below?',
                key: 'weightgoal',
                content: 'My weight has affected my ability to socialize or engage with friends and family',
                img: 'https://buyflow-web-assets.noom.com/bfc2/media/brocolli-picnic.fa1506cdbfe882470fa8005d3cb7f774.webp',
                id:'',
                options: [
                    {
                        label: 'The same no matter my weight',
                        key: true,
                        value: '5',
                        id:1
                    },
                    {
                        label: 'More if I were to achieve my weight goal',
                        key: true,
                        value: '4',
                        id:2
                    },
                ]
            },
        ]
    },
]