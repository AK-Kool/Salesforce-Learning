import { api, LightningElement, wire } from 'lwc';
import { publish,MessageContext } from 'lightning/messageService';
import CASE_CHANNEL from '@salesforce/messageChannel/Case_Channel__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QuickCloseCase extends LightningElement 
{
    @api caseRecordId;

    @wire(MessageContext)
    messageContext;

    handleSuccess(event)
    {
        const successToast = new ShowToastEvent({
            title: 'Record Updated!',
            message: 'Case is Updated.',
            variant: 'success'
        });
        this.dispatchEvent(successToast);
        
        this.handleBack();
    }
    handleBack()
    {
        const payload = {
            caseAction: 'closeQuickClose'
        };
        publish(this.messageContext , CASE_CHANNEL , payload);
    }
}