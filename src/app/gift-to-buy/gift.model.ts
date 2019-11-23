import { Gift } from '../gift/gift.model'

export class RecipientGift {
    firstName: string
    lastName: string
    locked: boolean
    wishes: Gift[]
}