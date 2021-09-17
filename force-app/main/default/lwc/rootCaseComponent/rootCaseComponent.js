import { api, LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CASE_CHANNEL from '@salesforce/messageChannel/Case_Channel__c';

export default class RootCaseComponent extends LightningElement 
{
    @api recordId;
    
    _headerValue = false;
    _footerValue = false;
    _modalValue = false;

    subscription = null;
    @wire(MessageContext)
    messageContext;

    isDataVisible = false;
    isNewVisible= false;
    isQuickCloseVisible = false;

    // for Quick Close
    caseRecordId;

    subscribeToMessageChannel()
    {
        this.subscription = subscribe(
            this.messageContext,
            CASE_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message){
        if(message.caseAction === 'hidefooter')
        {
            this._footerValue = false;
        }
        else if(message.caseAction === 'cancel')
        {
            this.isNewVisible = false;
            this.isQuickCloseVisible = false;
            this.isDataVisible = true;
            this._headerValue = true;
            this._footerValue = true;
            this.handleClose();
        }
        else if(message.caseAction === 'createNewCase')
        {
            this.isQuickCloseVisible = false;
            this.isDataVisible = false;
            this.isNewVisible = true;
        }
        else if(message.caseAction === 'closeNewCmp')
        {
            this.isNewVisible = false;
            this._headerValue = true;
            this.isDataVisible = true;
        }
        else if(message.caseAction === 'hideHeader')
        {
            this._headerValue = false;
        }
        else if(message.caseAction === 'closeQuickClose')
        {
            this.isNewVisible = false;
            this.isQuickCloseVisible = false;
            this.isDataVisible = true;
            this._headerValue = true;
        }
    }

    get isHeaderVisible()
    {
        return this._headerValue;
    }
    get isFooterVisible()
    {
        return this._footerValue;
    }
    get isModalOpen()
    {
        return this._modalValue;
    }
    connectedCallback(){
        this._headerValue = true;
        this._footerValue = true;
        this.subscribeToMessageChannel();
        this.isDataVisible = true;
    }
    handleClick()
    {
        this._modalValue = true;
    }
    handleClose()
    {
        this._modalValue = false;
        this._footerValue = true;
    }
    handleCaseSelect(event){
        this.caseRecordId = event.detail;
        this.isDataVisible = false;
        this._headerValue = false;
        this.isNewVisible = false;
        this.isQuickCloseVisible = true;       
    }
}