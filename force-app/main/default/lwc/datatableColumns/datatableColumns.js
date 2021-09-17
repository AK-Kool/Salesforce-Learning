const columns = [
    {
        label: 'Case Number',
        fieldName: 'caseNumberWithUrl',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'caseNumber' },
            target: '_blank'
        }
    },
    {
        label: 'Subject',
        fieldName: 'caseSubjectWithUrl',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'caseSubject' },
            target: '_blank'
        }
    },
    {
        label: 'Case Owner',
        fieldName: 'caseOwnerWithUrl',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'caseOwner' },
            target: '_blank'
        }
    },
    {
        label: 'Status',
        fieldName: 'caseStatus',
        initialWidth: 80,
    },
    {
        label: 'Action',
        type: 'button',
        initialWidth: 120,
        typeAttributes: {
            label: 'Quick Close',
            name: 'close',
            disabled: { fieldName: 'isDisabled' },
            value: 'close',
            iconPosition: 'left'
        }
    }    
];

export { columns };