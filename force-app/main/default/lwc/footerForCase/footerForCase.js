import { LightningElement , wire } from 'lwc';
import { publish, subscribe ,MessageContext } from 'lightning/messageService';
import CASE_CHANNEL from '@salesforce/messageChannel/Case_Channel__c';

export default class FooterForCase extends LightningElement 
{
    @wire(MessageContext)
    messageContext

    subscription = null;
    isCreateVisible = false;

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
        if(message.caseAction === 'createButton')
        {
            this.isCreateVisible = true;
        }
        else if(message.caseAction === 'hideCreateButton')
        {
            this.isCreateVisible = false;
        }
    }

    connectedCallback()
    {
        this.subscribeToMessageChannel();
    }

    handleClick(event)
    {
        if(event.target.name === 'cancel')
        {
            this.isCreateVisible = false;
            const payload = {
                caseAction: 'cancel'
            };
            publish(this.messageContext, CASE_CHANNEL, payload);
        }
        else if(event.target.name === 'create')
        {
            const payload = {
                caseAction: 'submitNewCaseForm'
            };
            publish(this.messageContext, CASE_CHANNEL, payload);
        }
    }
}