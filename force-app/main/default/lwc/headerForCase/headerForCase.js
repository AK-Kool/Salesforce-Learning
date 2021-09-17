import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CASE_CHANNEL from '@salesforce/messageChannel/Case_Channel__c';

export default class HeaderForCase extends LightningElement 
{
    @wire(MessageContext)
    messageContext;

    handleNewClick()
    {
        const payload = {
            caseAction: 'createNewCase'
        };
        publish(this.messageContext, CASE_CHANNEL, payload);
    }
}