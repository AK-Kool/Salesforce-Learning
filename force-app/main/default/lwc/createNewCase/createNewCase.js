import { api, LightningElement , wire } from 'lwc';
import { publish, subscribe ,MessageContext } from 'lightning/messageService';
import CASE_CHANNEL from '@salesforce/messageChannel/Case_Channel__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateNewCase extends LightningElement 
{
    @api recordId;

    @wire(MessageContext)
    messageContext;

    subscription = null;

    subscribeToMessageChannel()
    {
        this.subscription = subscribe(
            this.messageContext,
            CASE_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message)
    {
        if(message.caseAction === 'submitNewCaseForm')
        {
            this.template.querySelector('lightning-record-edit-form').submit();
        }
    }

    connectedCallback()
    {
        this.subscribeToMessageChannel();

        const payloadFooter = {
            caseAction: 'createButton'
        };
        publish(this.messageContext, CASE_CHANNEL, payloadFooter);

        const payload = {
            caseAction: 'hideHeader'
        };
        publish(this.messageContext, CASE_CHANNEL, payload);
    }

    handleBack()
    {
        const payload = {
            caseAction: 'closeNewCmp'
        };
        publish(this.messageContext, CASE_CHANNEL, payload);

        const payload2 = {
            caseAction: 'hideCreateButton'
        };
        publish(this.messageContext , CASE_CHANNEL , payload2);
    }

    handleSuccess(event)
    {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if(inputFields)
        {
            inputFields.forEach(field => {
                field.reset();
            });
        }

        const successToast = new ShowToastEvent({
            title: 'Record Created!',
            message: 'New Case is Created.',
            variant: 'success'
        });
        this.dispatchEvent(successToast);

        const payload = {
            caseAction: 'hideCreateButton'
        };
        publish(this.messageContext , CASE_CHANNEL , payload);

        this.handleBack();
    }
}